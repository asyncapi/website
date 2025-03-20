import automatedTools from '../config/tools-automated.json';
import manualTools from '../config/tools-manual.json';
import allTags from '../config/all-tags.json';
import { ToolsListData, ToolData } from '../types/components/tools/ToolDataType';

// Cache processed results to avoid unnecessary reprocessing
let cachedToolsData: ToolsListData | null = null;

export const processToolsData = (): ToolsListData => {
  // Return cached data if available
  if (cachedToolsData) return cachedToolsData;

  // Create a tag color lookup map
  const tagColorMap: Record<string, { color: string; borderColor: string }> = {};

  // Process allTags to build the color map
  if (Array.isArray(allTags)) {
    allTags.forEach((tag: any) => {
      tagColorMap[tag.name] = {
        color: tag.color,
        borderColor: tag.borderColor
      };
    });
  } else if (allTags.languages && allTags.technologies) {
    // Handle structure with separate languages and technologies arrays
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

  // Initialize the result object
  const result: ToolsListData = {};

  // Helper function to process a tool
  const processTool = (tool: any): ToolData => {
    // Process technology tags with color information
    const processedTechnology = Array.isArray(tool.filters?.technology)
      ? tool.filters.technology.map((tech: string) => ({
          name: tech,
          color: tagColorMap[tech]?.color || '#cccccc',
          borderColor: tagColorMap[tech]?.borderColor || '#999999'
        }))
      : [];

    // Process language with color information
    const processedLanguage = tool.filters?.language
      ? [{
          name: tool.filters.language,
          color: tagColorMap[tool.filters.language]?.color || '#cccccc',
          borderColor: tagColorMap[tool.filters.language]?.borderColor || '#999999'
        }]
      : undefined;

    // Return processed tool object with null descriptions converted to undefined
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

  // Process tools from both sources
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

  // Cache and return the result
  cachedToolsData = result;
  return result;
};
