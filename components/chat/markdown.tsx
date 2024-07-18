import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

function LinkRenderer(props: any) {
  return (
    <a className='text-sky-300 border-b-2 pb-[1px] border-dashed border-sky-300' href={props.href} target="_blank" rel="noreferrer noopener">
      {props.children}
    </a>
  );
}

function UnorderedListRenderer(props: any) {
  return (
    <ul className="list-disc list-inside flex flex-col gap-1 mb-4">{props.children}</ul>
  );
}

function OrderedListRenderer(props: any) {
  return (
    <ol className="list-decimal list-inside flex flex-col gap-1 mb-4">{props.children}</ol>
  );
}

export default function Markdown({content}: {content: string}) {
  return (
    <ReactMarkdown
      className={"markdown flex flex-col gap-4"}
      components={{ a: LinkRenderer, ul: UnorderedListRenderer, ol: OrderedListRenderer }}
      remarkPlugins={[remarkGfm]}
    >
      {content}
    </ReactMarkdown>
  )
}