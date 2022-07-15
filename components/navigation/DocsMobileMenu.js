import ClickableLogo from '../ClickableLogo'
import DocsNav from './DocsNav'

export default function DocsMobileMenu({
  post,
  navigation,
  onClickClose = () => { },
}) {
  return (
    <div className="z-60 lg:hidden">
      <div className="relative inset-0 flex z-40">
        <div className=" flex-1 flex flex-col max-w-xs w-full bg-white">
          <div className="flex-1 h-0 overflow-y-auto">
            <nav className="mt-5 px-2 mb-4">
              <ul>
                {Object.values(navigation).map(navItem => (
                  <DocsNav item={navItem} active={post.slug} onClick={onClickClose} />
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}
