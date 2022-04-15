import React from "react"
import styled from "styled-components"
import {AiFillDelete} from "react-icons/ai"
import avatar from "./logo.png"
import moment from "moment"

const App = ()=>{

  const [image, setImage] = React.useState(avatar)
  const [title, setTitle] = React.useState("")
  const [data, setData] = React.useState([])

  const addItems = ()=>{
    const infos = {
      id: data.length + 1,
      image: image,
      title: title,
      time: Date.now()
    }
    setData([...data, infos])
    setTitle("")
    setImage(avatar)
  }

  const imageUpload = (e)=>{
    const file = e.target.files[0]
    const res = URL.createObjectURL(file)
    setImage(res)
  }

 

  React.useEffect(()=>{
    const getLocalData = JSON.parse(localStorage.getItem("check"))
    setData(getLocalData)
  },[])

  React.useEffect(()=>{
    localStorage.setItem("check", JSON.stringify(data))
  },[data])

  const delteItem = (id)=>{
    let cancel = data.filter((e)=> e.id !== id)
    setData(cancel)
  }

  return (
    <Container>
    <Wrapper>
    <PostCont>
    <Image src={image}/>
    <Label htmlFor="pix">Choose File</Label>
    <input style={{display: "none"}} type="file" id="pix" onChange={imageUpload}/>
    <Input placeholder="Enter title"
    value={title}
    onChange={(e)=>{
      setTitle(e.target.value)
    }}/>
    <Submit onClick={()=>{
      addItems()
    }}>Submit</Submit>
    </PostCont>
    <ViewCont>
    {data.map((props)=>(
      <Box key={props.id}>
    <IconAndTime>
    <Icon>{(props.title).charAt(0)}</Icon>
    <Time>{moment(props.time).fromNow()}</Time>
    </IconAndTime>
    <ImageView src={props.image}/>
    <Title>{props.title}</Title>
    <span onClick={()=>{
      delteItem(props.id)
    }}><AiFillDelete/></span>
    
    </Box>
    ))}
    </ViewCont>
    </Wrapper>
    </Container>
  )
}

export default App

const Title = styled.div`
color: white;
font-size: 14px;
margin: 15px 0;
font-family:hobo std;
text-align: center;
width: 95%;
`
const ImageView = styled.img`
width: 100%;
height: 170px;
object-fit:cover;
`
const Time = styled.div`
font-size: 14px;
color: lightgray;
`
const Icon = styled.div`
width: 25px;
height: 25px;
color:whitesmoke;
text-transform: uppercase;
font-size: 10px;
display: flex;
font-weight: bold;
justify-content: center;
align-items: center;
border-radius: 50%;
background-color: red;
`
const IconAndTime = styled.div`
margin-top: 10px;
display: flex;
justify-content: space-between;
align-items: center;
width: 90%;
margin-bottom: 20px;
`
const Box = styled.div`
border: 1px solid gray;
width: 240px;
height: 320px;
display: flex;
flex-direction: column;
align-items: center;
overflow: hidden;
border-radius: 8px;
cursor: pointer;
transition: all 350ms linear;
transform: scale(1);
margin: 15px;
position: relative;
span{
  opacity: 0;
  transition: all 350ms;
}
:hover{
  border: 1px solid whitesmoke;
  transform: scale(1.02);
  
  span{
    opacity:1;
    color: red;
position: absolute;
bottom: 10px;
font-size: 18px;
  }
}
`
const Submit = styled.div`
width: 300px;
height: 32px;
display: flex;
color: white;
background-color:lightgray;
justify-content: center;
align-items: center;
text-transform: uppercase;
background-color: red;
font-size: 14px;
transition: all 350ms;
transform: scale(1);
margin-bottom: 30px;
:hover{
  transform: scal(1.01);
  cursor: pointer;
  background-color:gray;
}
`
const Input = styled.input`
width: 300px;
height: 32px;
display: flex;
color: white;
background-color:lightgray;
justify-content: center;
margin-bottom: 20px;
outline: none;
::placeholder{
  color: white;
  margin-left: 5px;
}
`
const Label = styled.label`
width: 170px;
height: 30px;
display: flex;
color: white;
background-color:gray;
justify-content: center;
align-items: center;
font-size: 14px;
border-radius: 15px;
transition: all 350ms;
transform: scale(1);
margin-bottom: 20px;
:hover{
  transform: scal(1.01);
  cursor: pointer;
  background-color:lightgray;
}

`
const Image = styled.img`
width: 190px;
height: 180px;
background-color: white;
border-radius: 5px;
margin-bottom: 10px;

`
const ViewCont = styled.div`
width: 95%;
display: flex;
flex-wrap: wrap;
`
const PostCont = styled.div`
width: 100%;
display: flex;
align-items:center;
margin-top: 20px;
flex-direction: column;
margin-bottom: 50px;
`
const Wrapper = styled.div`
width: 100%;
display: flex;
align-items:center;
flex-direction: column;
margin-bottom: 30px;
`
const Container = styled.div`
width: 100%;
min-height: 100vh;
height: 100%;
padding: 0 0 0 0;
margin: 0;
display: flex;
justify-content: center;
background-color: black;
`