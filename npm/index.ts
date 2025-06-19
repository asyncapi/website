import { runBuildPostList } from './runners/build-post-list-runner';
import { runBuildDashboard } from './runners/build-dashboard-runner';
import { runBuildTools } from './runners/build-tools-runner';
import { runCaseStudies } from './runners/case-studies-runner';
import { runBuildNewsroomVideos } from './runners/build-newsroom-videos-runner';
import { logger } from '../scripts/helpers/logger';
import { runBuildMeetings } from './runners/build-meetings-runner';
import { runBuildFinanceInfoList } from './runners/build-finance-info-list-runner';
import { runBuildAdoptersList } from './runners/build-adopters-list-runner';
import { runBuildPages } from './runners/build-pages-runner';
import { runBuildRss } from './runners/build-rss-runner';

async function main() {
  let errorFaced: boolean = false;

  const buildTasks = [
    { name: 'posts', task: runBuildPostList },
    { name: 'dashboard', task: runBuildDashboard },
    { name: 'tools', task: runBuildTools },
    { name: 'caseStudies', task: runCaseStudies },
    { name: 'newsroomVideos', task: runBuildNewsroomVideos },
    { name: 'meetings', task: runBuildMeetings },
    { name: 'finance', task: runBuildFinanceInfoList },
    { name: 'adopters', task: runBuildAdoptersList },
    { name: 'pages', task: runBuildPages },
    { name: 'rss', task: runBuildRss }
  ];

  try {
    const results = await Promise.allSettled(
      buildTasks.map(({ task }) => task())
    );

    results.forEach((result, index) => {
      if (result.status === 'rejected') {
        errorFaced = true;
        logger.error(`Error building ${buildTasks[index].name}:`, result.reason);
      } else {
        logger.info(`Successfully executed ${buildTasks[index].name}`);
      }
    });

    if (errorFaced) {
      logger.info('Some scripts faced error while running, please check the console for more details');
      process.exitCode = 1; // surface the failure to CI so that it can be tracked
    } else {
      logger.info('Successfully executed all build scripts');
    }
  } catch (error) {
    logger.error('Error executing build scripts:', error);
    throw new Error('Error executing build scripts', { cause: error });
  }
}

main();
