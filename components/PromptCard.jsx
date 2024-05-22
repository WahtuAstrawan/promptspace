"use client"

import { useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const [copied, setCopied] = useState('');
  const {data: session} = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 3500);
  }

  const handleUsernameClick = (creatorId) => {

  }

  return (
    <div className='prompt_card'>
      <div className='flex justify-between items-start gap-5'>
        {pathName === '/profile' && (
          <div className='flex-1 flex justify-start items-center gap-3'>
            <Image
              src={post.creator.image}
              alt='user_image'
              width={40}
              height={40}
              className='rounded-full object-contain'
            />

            <div className='flex flex-col'>
              <h3 className='font-satoshi font-semibold text-gray-900'>{post.creator.username}</h3>
              <p className='font-inter text-sm text-gray-500'>{post.creator.email}</p>
            </div>
          </div>
        )}

        {pathName === '/' && (
          <div className='flex-1 flex justify-start items-center gap-3 cursor-pointer' onClick={handleUsernameClick(post.creator._id)}>
            <Image
              src={post.creator.image}
              alt='user_image'
              width={40}
              height={40}
              className='rounded-full object-contain'
            />

            <div className='flex flex-col'>
              <h3 className='font-satoshi font-semibold text-gray-900'>{post.creator.username}</h3>
              <p className='font-inter text-sm text-gray-500'>{post.creator.email}</p>
            </div>
          </div>
        )}
        <div className='copy_btn' onClick={() => handleCopy()}>
          <Image
            src={copied === post.prompt
              ? '/assets/icons/tick.svg'
              : '/assets/icons/copy.svg'
            }
            width={12}
            height={12}
          />
        </div>
      </div>

      <p className='my-4 font-satoshi text-sm text-gray-700'>{post.prompt}</p>
      {pathName === '/' && (
        <p className='font-inter text-sm blue_gradient cursor-pointer' onClick={() => handleTagClick && handleTagClick(post.tag)}>#{post.tag}</p>
      )}

      {pathName === '/profile' && (
        <p className='font-inter text-sm blue_gradient'>#{post.tag}</p>
      )}

      {session?.user.id === post.creator._id && pathName === '/profile' && (
        <div className='mt-4 flex-end gap-4 border-t border-gray-100 pt-2'>
          <p className='font-inter text-sm green_gradient cursor-pointer' onClick={handleEdit}>
            Edit
          </p>
          <p className='font-inter text-sm orange_gradient cursor-pointer' onClick={handleDelete}>
            Delete
          </p>
        </div>
      )}
    </div>
  )
}

export default PromptCard