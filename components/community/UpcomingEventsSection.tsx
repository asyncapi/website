import React, { useState } from 'react';

import EventFilter from '@/components/navigation/EventFilter';
import EventPostItem from '@/components/navigation/EventPostItem';
import Heading from '@/components/typography/Heading';
import Paragraph from '@/components/typography/Paragraph';
import meetings from '@/config/meetings.json';
import type { Event } from '@/types/pages/community/Community';
import { HeadingLevel, HeadingTypeStyle } from '@/types/typography/Heading';
import { ParagraphTypeStyle } from '@/types/typography/Paragraph';
import { getEvents } from '@/utils/staticHelpers';

/**
 * @description UpcomingEventsSection component for displaying upcoming events with pagination
 */
export default function UpcomingEventsSection() {
  const [events, setEvents] = useState(getEvents(meetings));
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 6;

  // Calculate pagination
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);
  const totalPages = Math.ceil(events.length / eventsPerPage);

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Scroll to top of events section
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Previous button
    pageNumbers.push(
      <button
        key='prev'
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className='rounded border border-gray-300 bg-white px-3 py-2 text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50'
        data-testid='Pagination-Prev'
      >
        &lt;
      </button>
    );

    // First page
    if (startPage > 1) {
      pageNumbers.push(
        <button
          key={1}
          onClick={() => goToPage(1)}
          className='rounded border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-50'
          data-testid='Pagination-Page-1'
        >
          1
        </button>
      );
      if (startPage > 2) {
        pageNumbers.push(
          <span key='ellipsis1' className='px-2 text-gray-500'>
            ...
          </span>
        );
      }
    }

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => goToPage(i)}
          className={`rounded border px-4 py-2 ${
            currentPage === i
              ? 'border-indigo-600 bg-indigo-600 text-white'
              : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
          }`}
          data-testid={`Pagination-Page-${i}`}
        >
          {i}
        </button>
      );
    }

    // Last page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(
          <span key='ellipsis2' className='px-2 text-gray-500'>
            ...
          </span>
        );
      }
      pageNumbers.push(
        <button
          key={totalPages}
          onClick={() => goToPage(totalPages)}
          className='rounded border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-50'
          data-testid={`Pagination-Page-${totalPages}`}
        >
          {totalPages}
        </button>
      );
    }

    // Next button
    pageNumbers.push(
      <button
        key='next'
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className='rounded border border-gray-300 bg-white px-3 py-2 text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50'
        data-testid='Pagination-Next'
      >
        &gt;
      </button>
    );

    return pageNumbers;
  };

  return (
    <div className='py-20' data-testid='UpcomingEvents-Section'>
      <div className='text-center'>
        <Heading level={HeadingLevel.h2} typeStyle={HeadingTypeStyle.lg} className='mb-4 text-gray-900'>
          Upcoming Events
        </Heading>
        <Paragraph typeStyle={ParagraphTypeStyle.md} className='mx-auto mb-12 max-w-2xl text-gray-600'>
          Don't miss out on these amazing community gatherings
        </Paragraph>
      </div>

      {/* Events Grid */}
      <div className='mt-10'>
        {!currentEvents || currentEvents.length === 0 ? (
          <div className='flex content-center justify-center'>
            <Paragraph typeStyle={ParagraphTypeStyle.md} className='mx-auto mt-5 max-w-2xl'>
              No Events. Check back later!
            </Paragraph>
          </div>
        ) : (
          <ul className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3' data-testid='UpcomingEvents-Grid'>
            {currentEvents.map((event: Event, index: number) => {
              return <EventPostItem key={index} id={event.title} post={event} />;
            })}
          </ul>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className='mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row' data-testid='UpcomingEvents-Pagination'>
          <div className='flex items-center gap-2'>{renderPageNumbers()}</div>
          <div className='flex items-center gap-2'>
            <span className='text-sm text-gray-600'>Go to page</span>
            <select
              value={currentPage}
              onChange={(e) => goToPage(Number(e.target.value))}
              className='rounded border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-50'
              data-testid='Pagination-Dropdown'
            >
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <option key={page} value={page}>
                  {page}/{totalPages}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
}

