import automatedTools from '../config/tools-automated.json';
import manualTools from '../config/tools-manual.json';
import allTags from '../config/all-tags.json';
import { ToolsListData, ToolData } from '../types/components/tools/ToolDataType';

// Caching the processed results to avoid unnecessary reprocessing of the data
let cachedToolsData: ToolsListData | null = null;

export const processToolsData = (): ToolsListData => {
  // Returning the cached data if available in the memory
  if (cachedToolsData) return cachedToolsData;

  // Creating a tag color lookup mapping from the allTags data
  const tagColorMap: Record<string, { color: string; borderColor: string }> = {};

  // Processing allTags to build the color map from the allTags data
  if (Array.isArray(allTags)) {
    allTags.forEach((tag: any) => {
      tagColorMap[tag.name] = {
        color: tag.color,
        borderColor: tag.borderColor
      };
    });
  } else if (allTags.languages && allTags.technologies) {
    // Handling the structure with separate languages and technologies arrays for each language and technology array separately in allTags
    allTags.languages.forEach((tag: any) => {
      tagColorMap[tag.name] = {
        color: tag.color,
        borderColor: tag.borderColor
      };
    });

    allTags.technologies.forEach((tag: any) => {
      tagColorMap[tag.name] = {
        color: tag.color,
        borderColor: tag.borderColor
      };
    });
  }

  // Initializing the result object to store the processed tools data in the required format
  const result: ToolsListData = {};

  // Helper function to process a tool object and return the processed tool object
  const processTool = (tool: any): ToolData => {
    // Processing technology tags with color information if available in the tool data and convert null descriptions to undefined
    const processedTechnology = Array.isArray(tool.filters?.technology)
      ? tool.filters.technology.map((tech: string) => ({
          name: tech,
          color: tagColorMap[tech]?.color || '#cccccc',
          borderColor: tagColorMap[tech]?.borderColor || '#999999'
        }))
      : [];

    // Processing language tags with color information if available in the tool data and convert null descriptions to undefined
    const processedLanguage = tool.filters?.language
      ? [{
          name: tool.filters.language,
          color: tagColorMap[tool.filters.language]?.color || '#cccccc',
          borderColor: tagColorMap[tool.filters.language]?.borderColor || '#999999'
        }]
      : undefined;

    // Returning the processed tool object with null descriptions converted to undefined values
    return {
      title: tool.title,
      description: tool.description === null ? undefined : tool.description,
      links: tool.links,
      filters: {
        categories: tool.filters.categories || [],
        hasCommercial: tool.filters.hasCommercial,
        isAsyncAPIOwner: tool.filters.isAsyncAPIOwner,
        language: processedLanguage,
        technology: processedTechnology
      }
    };
  };

  // Processing tools from both sources and adding them to the result object
  [automatedTools, manualTools].forEach((source: any) => {
    Object.entries(source).forEach(([category, data]: [string, any]) => {
      if (!result[category]) {
        result[category] = {
          description: data.description,
          toolsList: []
        };
      }

      if (Array.isArray(data.toolsList)) {
        data.toolsList.forEach((tool: any) => {
          result[category].toolsList.push(processTool(tool));
        });
      }
    });
  });

  // Caching and return the result data from the result object
  cachedToolsData = result;
  return result;
};
