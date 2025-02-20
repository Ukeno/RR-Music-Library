// These components will be making separate API calls from the app
// component to serve specific data about our artist
import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate} from 'react-router-dom'


function ArtistView() {
    const { id } = useParams()
    const [ artistData, setArtistData ] = useState([])
    const navigate = useNavigate()


    useEffect(() => {
        const API_URL = `http://localhost:4000/album/${id}`
        const fetchData = async () => {
            const response = await fetch(API_URL)
            const resData = await response.json()
            setArtistData(resData.results)
        }
        fetchData()
    }, [id])

    const justAlbums = artistData.filter(entry => entry.collectionType === "Album")

    const renderAlbums = justAlbums.map((album, i) => {
        return (
            <div key={i}>
                <Link to={`/album/${album.collectionId}`}>
                    <p>{album.collectionName}</p>
                </Link>
            </div>
        )
    })

    return (
        <div>
            { artistData.length > 0 ? <h2>artistData[0].artistName</h2> : <h2>Loading...</h2> }
            {renderAlbums}
            <button onClick={() => navigate(-1)}>back</button>
            <button onClick={() => navigate('/')}>home</button>
        </div>
    )
}

export default ArtistView