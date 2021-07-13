import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from '../BlogForm'

describe('<BlogForm />', () => {
  let createBlogMock
  let blog
  beforeEach(() => {
    blog = {
      title: 'a testing title',
      author: 'Lukas McTester' ,
      url: 'www.testing.com'
    }
    createBlogMock = jest.fn()
  })
  test('calls event handler with right props', () => {
    const component = render(<BlogForm createBlog={createBlogMock} />)
    const titleInput = component.getByLabelText('title:')
    const authorInput = component.getByLabelText('author:')
    const urlInput = component.getByLabelText('url:')
    const form = component.container.querySelector('form')
    fireEvent.change(titleInput, {
      target: { value: blog.title }
    })
    fireEvent.change(authorInput, {
      target: { value: blog.author }
    })
    fireEvent.change(urlInput, {
      target: { value: blog.url }
    })
    fireEvent.submit(form)
    expect(createBlogMock.mock.calls).toHaveLength(1)
    expect(createBlogMock.mock.calls[0][0].title).toBe(blog.title)
    expect(createBlogMock.mock.calls[0][0].author).toBe(blog.author)
    expect(createBlogMock.mock.calls[0][0].url).toBe(blog.url)

  })
})