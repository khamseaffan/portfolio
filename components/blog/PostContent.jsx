import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';

export default function PostContent({ content }) {
  return (
    <article className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-code:before:content-[''] prose-code:after:content-[''] prose-pre:bg-slate-900 prose-pre:dark:bg-slate-800 prose-img:rounded-xl">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight, rehypeSlug]}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}
