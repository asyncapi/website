import { buildAdoptersList } from '@/scripts/adopters';

export async function runBuildAdoptersList() {
  try{
    await buildAdoptersList();
  }catch(error){
    throw error;
  }
} 