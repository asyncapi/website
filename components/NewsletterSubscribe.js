import Button from "./buttons/Button";

export default function NewsletterSubscribe ({
  formName = 'free form',
  className = 'p-8',
  dark = false,
  title = 'Subscribe to our newsletter to receive news about AsyncAPI.'
}) {
  if (!formName) throw new Error('Parameter formName is required for the NewsletterSubscribe component.')

  return (
    <div className={className}>
      <h3 className={`${dark ? 'text-primary-200' : 'text-primary-800'} text-lg font-bold`}>
        {title}
      </h3>
      <p className="text-gray-400 mt-2 text-sm">We respect your inbox. No spam, promise ✌️</p>
      <form action="/" className="mt-4 md:flex" data-netlify="true">
        <input type="hidden" name="form-name" value={formName} />
        <input type="text" name="name" placeholder="Your name" className="form-input block w-full sm:text-sm sm:leading-5 md:mr-2 md:mt-0 md:flex-1" required />
        <input type="email" name="email" placeholder="Your email" className="form-input block w-full mt-2 sm:text-sm sm:leading-5 md:mr-2 md:mt-0 md:flex-1" required />
        <Button type="submit" text="Subscribe" className="w-full mt-2 md:mr-2 md:mt-0 md:flex-1" />
      </form>
    </div>
  )
}