const sortBy = require('lodash/sortBy')
function buildNavTree(navItems) {
    const tree = {
      'welcome': {
        item: { title: 'Welcome', weight: 0, isRootSection: true, isSection: true, rootSectionId: 'welcome', sectionWeight: 0, slug: '/docs' },
        children: {}
      }
    }
    
    //first we make sure that list of items lists main section items and then sub sections, documents last
    const sortedItems = sortBy(navItems, ['isRootSection', 'weight', 'isSection']);
  
    sortedItems.forEach(item => {
      //identify main sections
      if (item.isRootSection) {
        tree[item.rootSectionId] = { item, children: {} }
      }
  
      //identify subsections
      if (item.parent) {
        tree[item.parent].children[item.sectionId] = { item, children: [] }
      }
  
      if (!item.isSection) {
        if (item.sectionId) {
          let section = tree[item.rootSectionId].children[item.sectionId];
          if (!section) {
            tree[item.rootSectionId].children[item.sectionId] = { item, children: [] }
          }
          tree[item.rootSectionId].children[item.sectionId].children.push(item)
        } else {
          tree[item.rootSectionId].children[item.title] = { item };
        }
      }
    })
  
    for (const [rootKey, rootValue] of Object.entries(tree)) {
      const allChildren = rootValue.children;
      const allChildrenKeys = Object.keys(allChildren);
  
      rootValue.children = allChildrenKeys
        .sort((prev, next) => {
          return allChildren[prev].item.weight - allChildren[next].item.weight;
        }).reduce(
          (obj, key) => { 
            obj[key] = allChildren[key]; 
            return obj;
          }, 
          {}
        );
  
      //handling subsections
      if (allChildrenKeys.length > 1) {
        for (const key of allChildrenKeys) {
          allChildren[key].children?.sort((prev, next) => {
            return prev.weight - next.weight;
          });
  
          // point in slug for specification subgroup to the latest specification version
          if (rootKey === 'reference' && key === 'specification') {
            allChildren[key].item.href = allChildren[key].children.find(c => c.isPrerelease === undefined).slug;
          }
        }
      }
    }
  
    return tree;
}

 // A recursion function, works on the logic of Depth First Search to traverse all the root and child posts of the 
 // DocTree to get sequential order of the Doc Posts
const convertDocPosts = (docObject) => {
    let docsArray = []
    // certain entries in the DocPosts are either a parent to many posts or itself a post.
    docsArray.push(docObject?.item || docObject) 
    if(docObject.children){
      let children = docObject.children
      Object.keys(children).forEach((child) => {
        let docChildArray = convertDocPosts(children[child])
        docsArray = [...docsArray, ...docChildArray]
      })
    }
    return docsArray
  }
  

 function addDocButtons(docPosts, treePosts){ 
  structuredPosts = []
  rootSections = []

  // Traversing the whole DocTree and storing each post inside them in sequential order
  Object.keys(treePosts).forEach((rootElement) => {    
    structuredPosts.push(treePosts[rootElement].item)
    if(treePosts[rootElement].children){
      let children = treePosts[rootElement].children
      Object.keys(children).forEach((child) => {
        let docChildArray = convertDocPosts(children[child])
        structuredPosts = [...structuredPosts, ...docChildArray]
      })
    }
  })
  // Appending the content of welcome page pf Docs from the posts.json
  structuredPosts[0] = docPosts.filter(p => p.slug === '/docs')[0]
  
  // Traversing the strucutredPosts in order to add `nextPage` and `prevPage` details for each page
  let countDocPages = structuredPosts.length
  structuredPosts = structuredPosts.map((post, index) => {
    // post item specifying the root Section or sub-section in the docs are excluded as 
    // they doesn't comprise any Doc Page or content to be shown in website. 
    if(post?.isRootSection || post?.isSection || index==0){ 
      if(post?.isRootSection || index==0) 
        rootSections.push(post.title)
      return post
    }

    let nextPage = {}, prevPage = {}
    let docPost = post;

    // checks whether the next page for the current docPost item exists or not
    if(index+1<countDocPages){ 
      // checks whether the next item inside structuredPosts is a rootElement or a sectionElement
      // if yes, it goes again to a next to next item in structuredPosts to link the nextPage
      if(!structuredPosts[index+1].isRootElement && !structuredPosts[index+1].isSection){
        nextPage = {
          title: structuredPosts[index+1].title,
          href: structuredPosts[index+1].slug
        }
      }else{
        nextPage = {
          title: `${structuredPosts[index+1].title} - ${structuredPosts[index+2].title}`,
          href: structuredPosts[index+2].slug
        }
      }
      docPost = {...docPost, nextPage}
    }

    // checks whether the previous page for the current docPost item exists or not
    if(index>0){
      // checks whether the previous item inside structuredPosts is a rootElement or a sectionElement
      // if yes, it goes again to a next previous item in structuredPosts to link the prevPage
      if(!structuredPosts[index-1]?.isRootElement && !structuredPosts[index-1]?.isSection){
        prevPage = {
          title: structuredPosts[index-1].title,
          href: structuredPosts[index-1].slug
        }
        docPost = {...docPost, prevPage}
      }else{
        // additonal check for the first page of Docs so that it doesn't give any Segementation fault
        if(index-2>=0){
          prevPage = {
            title: `${structuredPosts[index-1]?.isRootSection ? rootSections[rootSections.length - 2] : rootSections[rootSections.length - 1]} - ${structuredPosts[index-2].title}`,
            href: structuredPosts[index-2].slug
          }
          docPost = {...docPost, prevPage}
        }
      }
    }
    return docPost
  })
  return structuredPosts
}

module.exports = {buildNavTree, addDocButtons}