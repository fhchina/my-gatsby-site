import React from 'react'
import Layout from '@/components/layout'
import { GatsbyImage, IGatsbyImageData, ImageDataLike, getImage } from 'gatsby-plugin-image'
import Seo from '@/components/seo'
import { graphql } from 'gatsby'

interface Data {
	mdx: {
	  frontmatter: {
		title: string
		date: string
		hero_image_alt: string
		hero_image_credit_link: string
		hero_image_credit_text: string
		hero_image: {
		  childImageSharp: {
			gatsbyImageData: IGatsbyImageData
		  }
		}		  
	  }
	}
}

interface BlogPostProps {
	data: Data
	children: React.ReactNode
}

const BlogPost = ({ data, children }: BlogPostProps) => {
	const image = getImage(data.mdx.frontmatter.hero_image)!
	return (
	  <Layout pageTitle={data.mdx.frontmatter.title}>
		<p>Posted: {data.mdx.frontmatter.date}</p>
		<GatsbyImage
			image={image}
			alt={data.mdx.frontmatter.hero_image_alt}
		/>
		<p>
        Photo Credit:{" "}
        <a href={data.mdx.frontmatter.hero_image_credit_link}>
          {data.mdx.frontmatter.hero_image_credit_text}
        </a>
      </p>
		{children}
	  </Layout>
	)
  }

export const query = graphql`
  query ($id: String) {
    mdx(id: {eq: $id}) {
      frontmatter {
        title
        date(formatString: "MMMM D, YYYY")
		hero_image_alt
        hero_image_credit_link
        hero_image_credit_text
        hero_image {
          childImageSharp {
            gatsbyImageData
          }
        }		
      }
    }
  }
`

interface HeadProps {
	data: Data
}

export const Head = ({ data }: HeadProps) => <Seo title={data.mdx.frontmatter.title} />

export default BlogPost