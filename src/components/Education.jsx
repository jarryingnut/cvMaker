
import React, {useState} from 'react'
import styled from 'styled-components'
import Input from './common/Input'
import Button from './common/Button'
import TextArea from './common/TextArea'

const Wrapper = styled.form`
  margin-bottom: 2rem;
  .section-heading {
    margin-bottom: 1.5rem;
  }

  .grid-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    margin-bottom: 2rem;

    .rmv-edu {
      justify-self: left;
      transform: scale(0.8);
    }

    .textArea {
      grid-column: 1/-1;
    }
}
`

const InnerForm = ({innerForm, setInnerForm, id}) => {
  
  const removeInnerForm = (e) => {
    e.preventDefault();
    setInnerForm(innerForm.filter((_, index) => {
      return id !== index
    }))
  }
  
  return (
  <div className='grid-container'>
        <Input placeholder='Area'/>
        <Input placeholder='School'/>
        <Input placeholder='Start Date' className='title'/>
        <Input placeholder='End Date'/>
        <TextArea className='textArea' placeholder='description' rows={3}/>
        <Button onClick={removeInnerForm} className='rmv-edu'>Remove Education</Button>
  </div>
)}

const Education = () => {

  const [innerForm, setInnerForm] = useState([])

  const handleClick = (e) => {
    e.preventDefault()
    setInnerForm([...innerForm, InnerForm])
  }
  
  return (
    <Wrapper>
      <h2 className='section-heading'>Education</h2>
      {
        innerForm.map((Form, i) => <Form key={i} id={i} innerForm={innerForm} setInnerForm={setInnerForm}/>)
      }
    <Button onClick={handleClick}>Add Education</Button>
    </Wrapper>
  )
}


export default Education