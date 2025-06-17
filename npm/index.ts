import { runBuildPostList } from './runners/build-post-list-runner';
import { runBuildDashboard } from './runners/build-dashboard-runner';
import { runBuildTools } from './runners/build-tools-runner';
import { runCaseStudies } from './runners/case-studies-runner';
import { runBuildNewsroomVideos } from './runners/build-newsroom-videos-runner';
import { logger } from '../scripts/helpers/logger';
async function main() {

  let errorFaced: Boolean = false;
  try {

    try {
      await runBuildPostList();
    } catch (err) {
      errorFaced = true;
      logger.error('Error building posts: ', err as Error);
    }

    try {
      await runBuildDashboard();
    } catch (err) {
      errorFaced = true;
      logger.error('Error building dashboard: ', err as Error);
    }

    try {
      await runBuildTools();
    } catch (err) {
      errorFaced = true;
      logger.error('Error building tools: ', err as Error);
    }

    try {
      await runCaseStudies();
    } catch (err) {
      errorFaced = true;
      logger.error('Error building cases studies: ', err as Error);
    }

    try {
      await runBuildNewsroomVideos();
    } catch (err) {
      errorFaced = true;
      logger.error('Error building newsroom videos: ', err as Error);
    }

    if (errorFaced) {
      console.log("Some scripts faced error while running please check the console for more details")
    }
    else {
      console.log('Successfully executed all build scripts');
    }
  } catch (error) {
    console.error('Error executing build scripts:', error);
    throw new Error('Error executing build scripts: ', error as Error);
  }
}

main();
