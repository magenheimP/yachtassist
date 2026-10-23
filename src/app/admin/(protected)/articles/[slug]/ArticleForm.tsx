"use client";

import { useActionState } from "react";
import { saveArticleAction, type ActionState } from "../../../actions";

const initialState: ActionState = {};

export function ArticleForm({
  slug,
  title,
  body,
}: {
  slug: string;
  title: string;
  body: string;
}) {
  const [state, formAction, pending] = useActionState(
    saveArticleAction,
    initialState,
  );

  return (
    <form action={formAction} className="mt-4 flex flex-col gap-3">
      <input type="hidden" name="slug" value={slug} />
      <div className="flex flex-col gap-1">
        <label htmlFor="title" className="text-sm font-medium">
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          defaultValue={title}
          required
          className="rounded-md border border-border-soft px-3 py-2 text-sm"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="body" className="text-sm font-medium">
          Body
        </label>
        <p className="text-xs text-ink-soft">
          Use &quot;## Heading&quot; for section headings, &quot;###
          Subheading&quot; for smaller ones, lines starting
          with &quot;- &quot; for bullet lists or &quot;1. &quot; for numbered
          lists, &quot;**text**&quot; for bold, and blank lines between
          paragraphs.
        </p>
        <textarea
          id="body"
          name="body"
          defaultValue={body}
          required
          rows={20}
          className="rounded-md border border-border-soft px-3 py-2 font-mono text-sm"
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="mt-1 self-start rounded-md bg-cyan-600 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-700 disabled:opacity-60"
      >
        {pending ? "Saving..." : "Save"}
      </button>
      {state.error && (
        <p className="text-sm text-red-600">
          {state.error}
        </p>
      )}
      {state.success && (
        <p className="text-sm text-green-700">
          Saved. The live page now reflects this content.
        </p>
      )}
    </form>
  );
}
