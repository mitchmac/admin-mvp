import { getStaticPropsForTina, staticRequest } from "tinacms";

export default function Index(props) {
    const {title} = props.data.getPageDocument.data;
    return (
        <>
            <h1>{title}</h1>
        </>
    )
}

export async function getStaticProps({ params }) {

    const tinaProps = await getStaticPropsForTina({
        query: `
      query GetPageDocument($relativePath: String!) {
        getPageDocument(relativePath: $relativePath) {
          data {
            title
           }
        }
      }
    `,
        variables: {
            relativePath: `${params.filename}.md`
        },
    });

    return {
        props: {
            ...tinaProps,
        }

    }
}

export async function getStaticPaths() {
    const pagesListData = (await staticRequest({
        query: `#graphql
      {
        getPageList {
          edges {
            node {
              sys {
                filename
              }
            }
          }
        }
      }
    `,
    }));

    return {
        paths: pagesListData.getPageList.edges.map((page) => ({
             params: {filename: page.node.sys.filename},
        })),
        fallback: false,
    };
}