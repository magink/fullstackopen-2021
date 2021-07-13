import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Blog from '../Blog'

describe('<Blog />', () => {
  let blog
  let user
  let updateBlogMock
  let deleteBlogMock
  beforeEach(() => {
    blog = {
      title: 'this is a blog testing title',
      author: 'Kent Dodds',
      user: {
        id: '60739f99c1a86645d414797f',
        name: 'Tester McTester',
        username: 'mctest1'
      },
      likes: 1,
      url: 'www.testing.com'
    }
    user = {
      name: 'Tester McTester',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlcm1pbmF0b3IiLCJpZCI6IjYwNmE1OTBmOTZkZDliMjQ3ODA2YTEyNSIsImlhdCI6MTYxODIyODIzMywiZXhwIjoxNjE4MjMxODMzfQ.ru0YKaGnO0E6PX41TAJuspu0kt8_ltWZWx6SkusGqXc',
      username: 'mctest1'
    }
    updateBlogMock = jest.fn()
    deleteBlogMock = jest.fn()
  })
  test('renders only author and title by default', () => {
    const component = render(<Blog blog={blog} user={user} updateBlog={updateBlogMock} deleteBlog={deleteBlogMock}/>)
    const title = component.getByText('this is a blog testing title') // First method
    expect(title).toBeDefined()
    expect(component.container).toHaveTextContent('Kent Dodds') // Second Method
    const div = component.container.querySelector('.blogDetails') // Third method
    expect(div).toBeNull()
  })
  test('renders url and number of likes when show button is clicked', () => {
    const component = render(<Blog blog={blog} user={user} updateBlog={updateBlogMock} deleteBlog={deleteBlogMock}/>)
    const showButton = component.getByText('show')
    fireEvent.click(showButton)
    const div = component.container.querySelector('.blogDetails')
    expect(div).toBeDefined()
    expect(div).toHaveTextContent('www.testing.com')
    expect(div).toHaveTextContent('likes: 1')
  })
  test('like button click fires event handler', () => {
    const component = render(<Blog blog={blog} user={user} updateBlog={updateBlogMock} deleteBlog={deleteBlogMock}/>)
    const showButton = component.getByText('show')
    fireEvent.click(showButton)
    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)
    expect(updateBlogMock.mock.calls).toHaveLength(2)
  })
})