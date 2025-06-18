import { runBuildPostList } from './runners/build-post-list-runner';
import { runBuildDashboard } from './runners/build-dashboard-runner';
import { runBuildTools } from './runners/build-tools-runner';
import { runCaseStudies } from './runners/case-studies-runner';
import { runBuildNewsroomVideos } from './runners/build-newsroom-videos-runner';
import { logger } from '../scripts/helpers/logger';

async function main() {
  let errorFaced: boolean = false;

  const buildTasks = [
    { name: 'posts', task: runBuildPostList },
    { name: 'dashboard', task: runBuildDashboard },
    { name: 'tools', task: runBuildTools },
    { name: 'caseStudies', task: runCaseStudies },
    { name: 'newsroomVideos', task: runBuildNewsroomVideos }
  ];

  try {
    const results = await Promise.allSettled(
      buildTasks.map(({ task }) => task())
    );

    results.forEach((result, index) => {
      if (result.status === 'rejected') {
        errorFaced = true;
        logger.error(`Error building ${buildTasks[index].name}:`, result.reason);
      }
    });

    if (errorFaced) {
      logger.info('Some scripts faced error while running, please check the console for more details');
    } else {
      logger.info('Successfully executed all build scripts');
    }
  } catch (error) {
    logger.error('Error executing build scripts:', error);
    throw new Error('Error executing build scripts: ' + (error instanceof Error ? error.message : String(error)));
  }
}

main();
