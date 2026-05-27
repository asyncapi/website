import type { AsyncAPITool } from '@/types/scripts/tools';

import { compareToolsDeterministic } from '../../scripts/tools/compare-tools';

const tool = (title: string, repoUrl?: string) =>
  ({
    title,
    filters: { categories: [], language: [], technology: [] },
    links: repoUrl ? { repoUrl } : {}
  }) as unknown as AsyncAPITool;

describe('compareToolsDeterministic', () => {
  it('orders tools alphabetically by title', () => {
    const sorted = [tool('Zod Sockets'), tool('AsyncAPI Diff'), tool('nestjs-asyncapi')].sort(
      compareToolsDeterministic
    );

    expect(sorted.map((t) => t.title)).toEqual(['AsyncAPI Diff', 'nestjs-asyncapi', 'Zod Sockets']);
  });

  it('produces a stable order for titles that differ only in case (e.g. AsyncAPI.Net vs AsyncAPI.NET)', () => {
    const a = tool('AsyncAPI.Net', 'https://github.com/LEGO/AsyncAPI.NET');
    const b = tool('AsyncAPI.NET', 'https://github.com/ByteBardOrg/AsyncAPI.NET');

    const first = [a, b].sort(compareToolsDeterministic).map((t) => t.title);
    const second = [b, a].sort(compareToolsDeterministic).map((t) => t.title);

    expect(first).toEqual(second);
  });

  it('breaks ties on identical titles by repoUrl', () => {
    const first = tool('HTML Template', 'https://github.com/WSOL12/html-template');
    const second = tool('HTML Template', 'https://github.com/asyncapi/html-template');
    const third = tool('HTML Template', 'https://github.com/dipaksodani/async-gen');

    const sorted = [first, second, third].sort(compareToolsDeterministic);

    expect(sorted.map((t) => t.links?.repoUrl)).toEqual([
      'https://github.com/WSOL12/html-template',
      'https://github.com/asyncapi/html-template',
      'https://github.com/dipaksodani/async-gen'
    ]);
  });

  it('is order-independent: sorting the same set from different input orders yields the same output', () => {
    const set = [
      tool('AsyncAPI Studio', 'https://github.com/Shurtu-gal/action-test-bed'),
      tool('AsyncAPI Studio', 'https://github.com/asyncapi/studio'),
      tool('AsyncAPI.Net', 'https://github.com/LEGO/AsyncAPI.NET'),
      tool('AsyncAPI.NET', 'https://github.com/ByteBardOrg/AsyncAPI.NET'),
      tool('nestjs-asyncapi', 'https://github.com/flamewow/nestjs-asyncapi'),
      tool('Zod Sockets', 'https://github.com/RobinTail/zod-sockets')
    ];

    const sortedA = [...set].sort(compareToolsDeterministic).map((t) => `${t.title}|${t.links?.repoUrl}`);
    const sortedB = [...set]
      .reverse()
      .sort(compareToolsDeterministic)
      .map((t) => `${t.title}|${t.links?.repoUrl}`);
    const shuffled = [set[3], set[0], set[5], set[1], set[4], set[2]];
    const sortedC = [...shuffled].sort(compareToolsDeterministic).map((t) => `${t.title}|${t.links?.repoUrl}`);

    expect(sortedA).toEqual(sortedB);
    expect(sortedA).toEqual(sortedC);
  });

  it('treats undefined/null tools and missing repoUrl as empty strings (stable, no throw)', () => {
    const a = tool('Valid Tool', 'https://github.com/x/valid');
    const b = { title: 'No Repo Tool', filters: {}, links: {} } as unknown as AsyncAPITool;

    expect(() => [a, b, undefined, null].sort(compareToolsDeterministic as any)).not.toThrow();
    expect(compareToolsDeterministic(undefined, undefined)).toBe(0);
    expect(compareToolsDeterministic(a, a)).toBe(0);
  });
});
