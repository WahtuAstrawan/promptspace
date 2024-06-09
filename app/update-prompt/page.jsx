"use client";

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation';

import Form from '@components/Form';

const UpdatePrompt = () => {
  const router = useRouter();

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: '',
    tag: ''
  });
  const searchParams = useSearchParams();
  const promptId = searchParams.get('id');

  useEffect(() => {
    const getPromptDetails = async () => {
        const response = await fetch(`/api/prompt/${promptId}`);
        const data = await response.json();
        
        setPost({
            prompt: data.prompt,
            tag: data.tag
        });
    }

    if(promptId) getPromptDetails();

  }, [promptId])

  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if(!promptId) return alert("Prompt id not found");

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag
        })
      })

      if(response.ok){
        router.push('/profile');
      }
    } catch (error) {
      console.log(error)
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Form
          type="Update"
          post={post}
          setPost={setPost}
          submitting={submitting}
          handleSubmit={updatePrompt}
      />
    </Suspense>
  )
}

export default UpdatePrompt