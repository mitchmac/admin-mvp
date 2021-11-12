import {staticRequest} from "tinacms";

export default function Index(props) {

    let pages = props.getPageList.edges.map((page) =>
            <li><a href={page.node.sys.filename}>{page.node.sys.filename}</a></li>
    );

    return(
        <>
            <h2>Pages</h2>
            <ul>
                {pages}
            </ul>
            <a href="/admin">Admin</a>
        </>
    );
}

export async function getStaticProps() {
    return {
        props: (await staticRequest({
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
        }))
    }
}