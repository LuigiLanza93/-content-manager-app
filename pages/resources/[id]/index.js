import Layout from "components/Layout";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import ResourceLabel from "components/ResourceLabel";
import moment from "moment";

const ResourceDetail = ({resource}) => {
    const router = useRouter();

    if (router.isFallback) {
        return <div>Loading Data!</div>
    }

    const activateResource = () => {
        axios.patch('/api/resources', {...resource, status: 'active'})
            .then(_ => location.reload())
            .catch(_ => alert('Cannot activate the resource!'))
    }

    return(
        <Layout>
            <section className="hero ">
                <div className="hero-body">
                    <div className="container">
                        <section className="section">
                            <div className="columns">
                                <div className="column is-8 is-offset-2">
                                    <div className="content is-medium">
                                        <h2 className="subtitle is-4">{moment(resource.createdAt).format('LLL')} <ResourceLabel status={resource.status} /></h2>
                                        <h1 className="title">{resource.title}</h1>
                                        <p>{resource.description}</p>
                                        <p>Time to finish: {resource.timeToFinish} min</p>
                                        { resource.status === 'inactive' &&
                                            <>
                                                <Link href={`/resources/${resource.id}/edit`}>
                                                    <a className="button is-warning">
                                                        Update 
                                                    </a>
                                                </Link>
                                                <button className="button is-success ml-1" onClick={activateResource}>
                                                    Activate 
                                                </button>
                                            </>
                                        }
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </section>
        </Layout>
    )

}

// -------------------------------- GET INITIAL PROPS ----------------------------------------------------

// ResourceDetail.getInitialProps = async ({query}) => {
//     const dataRes = await fetch(`${process.env.API_URL}/resources/${query.id}`);
//     const data = await dataRes.json();

//     return {
//         resource: data
//     }
// }

// -------------------------------- GET STATIC PROPS ----------------------------------------------------

// export async function getStaticPaths() {
//     const dataRes = await fetch(`${process.env.API_URL}/resources/`);
//     const data = await dataRes.json();
//     const paths = data.map(resource => {
//         return{
//             params:{
//                 id: resource.id
//             }
//         }
//     })
//     return{
//         paths,
//         // fallback: false // means that other routes should resolve into 404
//         fallback: true
//     }
// }

// export async function getStaticProps({params}) {
//     const dataRes = await fetch(`${process.env.API_URL}/resources/${params.id}`);
//     const data = await dataRes.json();

//     return {
//         props: {
//             resource: data
//         },
//         revalidate: 1 // After 1 second the data is regenerated and it's HTML gets updated
//     }
// }

// -------------------------------- GET SERVER SIDE PROPS ----------------------------------------------------

export async function getServerSideProps({params}) {
    const dataRes = await fetch(`${process.env.API_URL}/resources/${params.id}`);
    const data = await dataRes.json();

    return {
        props: {
            resource: data
        }
    }
}

export default ResourceDetail;