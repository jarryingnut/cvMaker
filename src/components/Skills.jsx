import React, {useState, useEffect} from 'react'
import uniqid from 'uniqid';
import styled from 'styled-components'
import Button from './common/Button'
import Input from './common/Input'
import Skill from './Skill'
import { useFormContext } from 'react-hook-form'


const Wrap = styled.div`

  margin-bottom: 1.5rem;
  * {
    margin: 0.5rem 0;
  }

`
const Wrapper = styled.form`
  .flex-conatiner {
    display: flex;
    gap: 1rem;
    .skill-category {
      flex: auto;
    }
  }

  .flex-container-sub {
    display: flex;
    gap: 1rem;

    .skill-category-skill {
      flex: auto;
    }
  }

  .add-skill, .flex-container-sub{
    transform: scale(0.9);
  }

`

const SkillCategory = ({skillForm, setSkillForm, pid, index}) => {
  const {register, unregister} =  useFormContext();
  const [innerForm, setInnerForm] = useState([])

  const addSkill = (e) => {
    e && e.preventDefault()
    setInnerForm([...innerForm, {Skill: Skill, uid: uniqid()}])
  }

  useEffect(() => addSkill, [])


  const removeSkillCategory = (e) => {
    e.preventDefault();
    unregister(`skillCategory`)
    unregister(`skill`)
    //unregister()
    setSkillForm(skillForm.filter((item) => {
      let {uid} = item
      return uid !== pid;
    }))

  }
  
  return (
    <Wrapper>
      <div className='flex-conatiner'>
      {/* <Input className="skill-category" placeholder="Skill category" {...register(`skills.${index}.skillCategory`)}/> */}
      <Input className="skill-category" placeholder="Skill category" {...register(`skillCategory.${index}`)}/>
      <Button className='close-skill-category' onClick={removeSkillCategory}>X</Button>
      </div>
      {
          innerForm.map((item, i) => {
            let {Skill, uid} = item;
            return <Skill key={uid} id={uid} parentId={pid} innerForm={innerForm} setInnerForm={setInnerForm} index={i} parentIndex={index}/>
          }
        )
      }
    <Button className='add-skill' onClick={addSkill}>Add Skill</Button>
    </Wrapper>
  )
}

const Skills = () => {

  const [skillForm, setSkillForm] = useState([])

  const handleClick = (e) => {
    e && e.preventDefault()
    setSkillForm([...skillForm, {SkillCategory: SkillCategory, uid: uniqid()}])
  }

  useEffect(() => handleClick, [])


  return (
    <Wrap>
      <h2 className='section-heading'>Skills</h2>
      {
        skillForm.map((item, i) => {
          let {SkillCategory, uid} = item;
          return <SkillCategory key={uid} skillForm={skillForm} setSkillForm={setSkillForm} pid={uid} index={i}/>
        }
        )
      }
      <Button onClick={handleClick}>Add Skill Category</Button>
    </Wrap>
  )
}

export default Skills