const fs = require('fs');
const { rssFeed } = require('../scripts/build-rss.ts');
const { buildPostList } = require('../scripts/build-post-list.ts');
const { buildCaseStudiesList } = require('../scripts/casestudies/index.ts');
const { buildAdoptersList } = require('../scripts/adopters/index.ts');
const { buildFinanceInfoList } = require('../scripts/finance/index.ts');
const { start } = require('../scripts/index.ts');

jest.mock('../scripts/build-rss');
jest.mock('../scripts/build-post-list');
jest.mock('../scripts/casestudies');
jest.mock('../scripts/adopters');
jest.mock('../scripts/finance');

describe('start function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should call all functions in the correct order', async () => {
    await start();

    expect(buildPostList).toHaveBeenCalled();

    expect(rssFeed).toHaveBeenCalledWith(
      'blog',
      'AsyncAPI Initiative Blog RSS Feed',
      'AsyncAPI Initiative Blog',
      'rss.xml'
    );

    expect(buildCaseStudiesList).toHaveBeenCalled();
    expect(buildAdoptersList).toHaveBeenCalled();
    expect(buildFinanceInfoList).toHaveBeenCalled();
  });

  test('should throw an error if no finance data is found', async () => {
    jest.spyOn(fs, 'readdirSync').mockReturnValue([]);

    await expect(start()).rejects.toThrow('No finance data found in the finance directory.');

    expect(buildFinanceInfoList).not.toHaveBeenCalled();

    fs.readdirSync.mockRestore();
  });

  test('should process multiple years of finance data and create combined data', async () => {
    const mockYearData = {
      '2023': {
        'January': [
          { Category: 'Hosting', Amount: '100.00' },
          { Category: 'Marketing', Amount: '200.00' }
        ]
      },
      '2022': {
        'January': [
          { Category: 'Hosting', Amount: '50.00' },
          { Category: 'Development', Amount: '300.00' }
        ]
      }
    };

    const mockLinks = {
      '2023': [
        { category: 'Hosting', link: 'host.com' },
        { category: 'Marketing', link: 'market.com' }
      ],
      '2022': [
        { category: 'Development', link: 'dev.com' },
        { category: 'Hosting', link: 'oldhost.com' }
      ]
    };

    jest.spyOn(fs, 'readdirSync').mockImplementation((path) => {
      if (path.includes('finance')) return ['2023', '2022', 'json-data'];
      return [];
    });

    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fs, 'mkdirSync').mockImplementation(() => {});
    
    const readFileSyncMock = jest.spyOn(fs, 'readFileSync').mockImplementation((path) => {
      if (path.includes('2023/Expenses.json')) return JSON.stringify(mockYearData['2023']);
      if (path.includes('2022/Expenses.json')) return JSON.stringify(mockYearData['2022']);
      if (path.includes('2023/ExpensesLink.json')) return JSON.stringify(mockLinks['2023']);
      if (path.includes('2022/ExpensesLink.json')) return JSON.stringify(mockLinks['2022']);
      return '{}';
    });

    const writeFileSyncMock = jest.spyOn(fs, 'writeFileSync').mockImplementation(() => {});

    await start();

    // Verify combined expenses were calculated correctly
    const expectedCombinedExpenses = {
      'January': [
        { Category: 'Hosting', Amount: '150.00' },
        { Category: 'Marketing', Amount: '200.00' },
        { Category: 'Development', Amount: '300.00' }
      ]
    };

    const combinedExpensesCall = writeFileSyncMock.mock.calls.find(call => 
      call[0].includes('All_years/Expenses.json')
    );
    
    expect(JSON.parse(combinedExpensesCall[1])).toEqual(expectedCombinedExpenses);

    // Verify unique links were combined
    const expectedCombinedLinks = [
      { category: 'Hosting', link: 'host.com' },
      { category: 'Marketing', link: 'market.com' },
      { category: 'Development', link: 'dev.com' }
    ];

    const combinedLinksCall = writeFileSyncMock.mock.calls.find(call => 
      call[0].includes('All_years/ExpensesLink.json')
    );

    expect(JSON.parse(combinedLinksCall[1])).toEqual(expectedCombinedLinks);

    fs.readdirSync.mockRestore();
    fs.existsSync.mockRestore();
    fs.readFileSync.mockRestore();
    fs.writeFileSync.mockRestore();
    fs.mkdirSync.mockRestore();
  });

  test('should handle missing expense files gracefully', async () => {
    jest.spyOn(fs, 'readdirSync').mockReturnValue(['2023']);
    jest.spyOn(fs, 'existsSync').mockImplementation(path => !path.includes('Expenses.json'));
    jest.spyOn(fs, 'mkdirSync').mockImplementation(() => {});
    jest.spyOn(fs, 'writeFileSync').mockImplementation(() => {});
    jest.spyOn(fs, 'readFileSync').mockReturnValue('[]');

    await start();

    const writeFileSyncMock = fs.writeFileSync;
    
    // Verify empty combined data was written
    const combinedExpensesCall = writeFileSyncMock.mock.calls.find(call => 
      call[0].includes('All_years/Expenses.json')
    );
    
    expect(JSON.parse(combinedExpensesCall[1])).toEqual({});

    fs.readdirSync.mockRestore();
    fs.existsSync.mockRestore();
    fs.readFileSync.mockRestore();
    fs.writeFileSync.mockRestore();
    fs.mkdirSync.mockRestore();
  });
});
