import axios from "axios";

export default async function(req, res) {

    if (req.method === 'GET') {
        const dataRes = await fetch(`${process.env.API_URL}/resources`);
        const data = await dataRes.json();
    
        return res.send(data);
    }
    if (req.method === 'POST' || req.method === 'PATCH') {
        const { id, title, description, link, timeToFinish, priority } = req.body;
        if (!title || !description || !link || !timeToFinish || !priority) {
            return res.status(422).send('Data are missing!');
        }
        console.log(id);
        const url = req.method === 'POST' ? `${process.env.API_URL}/resources` : `${process.env.API_URL}/resources/${id}`;

        try {
            const axiosRes = await axios[req.method.toLowerCase()](url, req.body);
            return res.send(axiosRes.data)
        } catch (error) {
            console.log(error.message);
            return res.status(422).send('Data cannot be stored!');
        }
    }
}