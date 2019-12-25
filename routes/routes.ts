const router = require('express').Router()

interface Article {
  id: number;
  title:string;
  desc:string;
  content:string;
}
let Articles: Article[] = [
  {
    id:1,
    title:"Article Title",
    desc:"Article Description",
    content:"da content"
  },
  {
    id:2,
    title:"Article Title 2",
    desc:"Article Description",
    content:"da content"
  },
  {
    id:3,
    title:"Article Title 3",
    desc:"Article Description",
    content:"da content"
  },
]

const createArticle = (req:any, res:any, type:string) => {
  try {
    if(type.toLowerCase() !== "body" && type.toLowerCase() !== "params") {
      res.status(400).send("Invalid Type")
      return "Invalid Type"
    }
    const article: Article = {
      id:eval(`parseInt(req.${type}.id)`),
      title:eval(`req.${type}.title`),
      desc:eval(`req.${type}.desc`),
      content:eval(`req.${type}.content`)
    }
    const articles= Articles.push(article)
    res.status(200).send(article);
  }
  catch(err) {
    res.status(400).send(err)
  }
}
const readArticles = (req:any, res:any) => {
  try {
    res.status(200).send(Articles);
  }
  catch(err) {
    res.status(400).send(err)
  }
}
const readArticle = (req:any, res:any, type:string) => {
  if(type.toLowerCase() !== "body" && type.toLowerCase() !== "params") {
    res.status(400).send("Invalid Type")
    return "Invalid Type"
  }
  try {
    const searchingId = eval(`req.${type}.id`);
    const article = Articles.filter(obj => obj.id === parseInt(searchingId));
    res.status(200).send(article);
  }
  catch(err) {
    res.status(400).send(err)
  }
}
const updateArticle = (req:any, res:any, type:string) => {
  if(type.toLowerCase() !== "body" && type.toLowerCase() !== "params") {
    res.status(400).send("Invalid Type")
    return "Invalid Type"
  }

  try {
    const article: Article = {
      id:eval(`parseInt(req.${type}.id)`),
      title:eval(`req.${type}.title`),
      desc:eval(`req.${type}.desc`),
      content:eval(`req.${type}.content`)
    }
    Articles = [...Articles.filter(obj => obj.id != article.id),  article].sort()
    res.status(200).send("success")
  }
  catch(err) {
    res.status(400).send(err)
  }
}
const deleteArticle = (req:any, res:any, type:string) => {
  if(type.toLowerCase() !== "body" && type.toLowerCase() !== "params") {
    res.status(400).send("Invalid Type")
    return "Invalid Type"
  }
  try {
    const id = eval(`req.${type}.id`);
    Articles = Articles.filter(obj => obj.id !== parseInt(id));
    res.status(200).send(Articles);
  }
  catch(err) {
    res.status(400).send(err)
  }
}

// Creation Routes
router.post('/article', async (req:any, res:any) => createArticle(req, res, "body"));
router.post('/article/:id&:title&:desc&:content', async (req:any, res:any) => createArticle(req, res, "params"));
router.post('/article/:id/:title/:desc/:content', async (req:any, res:any) => createArticle(req, res, "params"));
// Read All Routes
router.get('/articles', async (req:any, res:any) => readArticles(req, res));

// Read Routes
router.get('/article', async (req:any, res:any) => readArticle(req, res, "body"));
router.get('/article/:id', async (req:any, res:any) => readArticle(req, res, "params"));

// Update Routes
router.put('/article', async (req:any, res:any) => updateArticle(req, res, "body"));
router.put('/article/:id&:title&:desc&:content', async (req:any, res:any) => updateArticle(req, res, "params"));
router.put('/article/:id/:title/:desc/:content', async (req:any, res:any) => updateArticle(req, res, "params"));

// Deletion Routes
router.delete('/article', async (req:any, res:any) => deleteArticle(req, res, "body"));
router.delete('/article/:id', async (req:any, res:any) => deleteArticle(req, res, "params"));

module.exports = router