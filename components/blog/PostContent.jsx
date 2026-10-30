import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';

export default function PostContent({ content }) {
  return (
    <article className="prose max-w-none font-body prose-headings:font-display prose-headings:tracking-tight prose-headings:text-[var(--ed-text)] prose-p:text-[var(--ed-muted)] prose-li:text-[var(--ed-muted)] prose-strong:text-[var(--ed-text)] prose-a:text-[var(--ed-text)] prose-code:text-[var(--ed-text)] prose-code:before:content-[''] prose-code:after:content-[''] prose-pre:bg-[var(--ed-raise)] prose-pre:text-[var(--ed-text)] prose-img:rounded-xl">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight, rehypeSlug]}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}
