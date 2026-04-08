export enum Float {
  LEFT = 'left',
  RIGHT = 'right'
}

/**
 * Defines the props for a Figure component, ensuring accessibility requirements are met.
 * This type definition is crucial for enforcing the inclusion of an `alt` attribute
 * for illustrations and other meaningful images, as highlighted in the issue.
 */
export interface FigureProps {
  /**
   * Accessible description for the figure, especially important for images/illustrations.
   * This property should be used to populate the `alt` attribute for `<img>` tags
   * or provide context for `aria-label`/`aria-labelledby` for more complex figures.
   * This is a mandatory field to ensure all meaningful visual content is perceivable.
   */
  alt: string;
  /**
   * Optional caption for the figure, displayed visually and often associated semantically
   * with the figure's content.
   */
  caption?: string;
  /**
   * Specifies the float direction of the figure within its container, utilizing the
   * existing `Float` enum.
   */
  float?: Float;
  // Additional props related to the Figure component can be added here.
}
