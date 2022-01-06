import Button from "./buttons/Button";
import Heading from "./typography/Heading";

export default function NewsletterSubscribe ({
  formName = 'free form',
  className = 'p-8 text-center',
  dark = false,
  title = 'Subscribe to our newsletter to receive news about AsyncAPI.',
  type,
}) {
  if (!formName) throw new Error('Parameter formName is required for the NewsletterSubscribe component.')

  return (
    <div className={className}>
      <Heading 
      level="h3"
      textColor="text-white"
      style="h2"
      text={title}
      className="mb-4"
      />
      <p className="text-gray-300 mb-8 text-lg">We respect your inbox. No spam, promise ✌️</p>
      <form className="md:flex" data-netlify="true">
        <input type="hidden" name="form-name" value={formName} />
        <input type="hidden" name="type" value={type} />
        <input type="text" name="name" placeholder="Your name" className="form-input block w-full sm:text-sm sm:leading-5 md:mr-2 md:mt-0 md:flex-1" required />
        <input type="email" name="email" placeholder="Your email" className="form-input block w-full mt-2 sm:text-sm sm:leading-5 md:mr-2 md:mt-0 md:flex-1" required />
        <Button type="submit" text="Subscribe" className="w-full mt-2 md:mr-2 md:mt-0 md:flex-1" />
      </form>
    </div>
  )
}