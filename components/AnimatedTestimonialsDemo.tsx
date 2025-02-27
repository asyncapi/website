import { AnimatedTestimonials } from '@/components/ui/animated-testimonials';

export function AnimatedTestimonialsDemo() {
  const testimonials = [
    {
      quote:
        'Microservices underline the need for event-based communication in distributed architectures. AsyncAPI brings the richness of the REST API ecosystem to asynchronous APIs.',
      name: 'Matt McLarty',

      designation: 'Global Leader of API Strategy at MuleSoft',

      src: '/img/testimonials/matt-mclarty.jpg',
    },
    {
      quote:
        'Event-driven APIs need love too! AsyncAPI brings the many benefits of a machine/human-readable specification to these nuanced approaches.',

      name: 'Bill Doerrfeld',

      designation: 'Editor in Chief at Nordic APIs',

      src: '/img/testimonials/bill-doerrfeld.jpg',
    },
    {
      quote:
        "Developers need to be able to quickly and consistently create event-driven applications that provide business value and react to customer needs in realtime. I can't count how many times I've heard developers ask for OpenAPI/Swagger style tools for the asynchronous and event-driven world, and that is exactly what the AsyncAPI initiative is making a reality.",

      name: 'Jonathan Schabowsky',

      designation: 'Sr. Architect, Office of the CTO at Solace',

      src: '/img/testimonials/jonathan-schabowsky.jpg',
    },
    {
      quote:
        'We’ve been focusing on event-driven APIs since 2014 and thank the AsyncAPI contributors every day for driving the community towards common standards.',

      name: 'Eric Horesnyi',

      designation: 'CEO at Streamdata.io',

      src: '/img/testimonials/eric-horesnyi.jpg',
    },
  ];
  return (
    <div className="text-center mt-8">
      <h2 className="text-4xl font-bold text-black mb-6">
        What the experts are saying
      </h2>
      <AnimatedTestimonials testimonials={testimonials} />
    </div>
  );
}
