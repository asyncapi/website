import { CaseStudyYaml,CaseStudyJson } from '../../types/tests/fixtures/fixtures/tools/caseStudyTypes';

export const caseStudyData: {
  yaml1: CaseStudyYaml;
  yaml2: CaseStudyYaml;
  json1: CaseStudyJson;
  json2: CaseStudyJson;
} = {
  yaml1: `
title: case study 1
description: random data
    `,

  yaml2: `
title: case study 2
description: again random data
    `,

  json1: {
    title: 'case study 1',
    description: 'random data'
  },

  json2: {
    title: 'case study 2',
    description: 'again random data'
  }
};
