import MenuBlocks from './MenuBlocks';
import { MenuItem } from '@/types/navigation/MenuBlocks';

interface FlyoutProps {
  items?: MenuItem[];
}

export default function Flyout({ items = [] }: FlyoutProps){
  return (
    <div className="absolute z-50 -ml-4 pt-3 transform w-screen max-w-md md:ml-12 md:transform md:-translate-x-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:max-w-3xl" data-testid="Flyout-main">
      <div className="rounded-lg shadow-lg">
        <div className="rounded-lg shadow-xs overflow-hidden">
          <div className="z-20 relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8 lg:grid-cols-2">
            <MenuBlocks items={items} />
          </div>
        </div>
      </div>
    </div>
  );
}
