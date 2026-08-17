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
          className="rounded-md border border-black/20 px-3 py-2 text-sm dark:border-white/20 dark:bg-transparent"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="body" className="text-sm font-medium">
          Body
        </label>
        <p className="text-xs text-black/50 dark:text-white/50">
          Use &quot;## Heading&quot; for section headings, lines starting
          with &quot;- &quot; for bullet lists, and blank lines between
          paragraphs.
        </p>
        <textarea
          id="body"
          name="body"
          defaultValue={body}
          required
          rows={20}
          className="rounded-md border border-black/20 px-3 py-2 font-mono text-sm dark:border-white/20 dark:bg-transparent"
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="mt-1 self-start rounded-md bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 disabled:opacity-60"
      >
        {pending ? "Saving..." : "Save"}
      </button>
      {state.error && (
        <p className="text-sm text-red-600 dark:text-red-400">
          {state.error}
        </p>
      )}
      {state.success && (
        <p className="text-sm text-green-700 dark:text-green-400">
          Saved. The live page now reflects this content.
        </p>
      )}
    </form>
  );
}
