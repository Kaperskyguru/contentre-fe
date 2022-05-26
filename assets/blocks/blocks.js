import { Headers } from './header.js'
import Contents from './content.js'
import { Contacts } from './contact.js'
import { Testimonials } from './testimonial.js'
import { Features } from './feature.js'
import { Blogs } from './blog.js'

export default (client) => {
  const contents = Contents(client)

  return [
    ...Contacts,
    ...Headers,
    ...contents,
    ...Features,
    ...Blogs,
    ...Testimonials
  ]
}
