import * as React from "react";

export const LabelButton = (props: any) => (
  <button
    type="button"
    className="flex px-3 py-1 text-xs text-white uppercase rounded-xl bg-purple-darker"
    {...props}
  >
    Max
  </button>
);
