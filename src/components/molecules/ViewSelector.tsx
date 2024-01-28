import { Select } from "@radix-ui/themes";
import { useLocalStorage } from "usehooks-ts";

export enum ViewEnum {
  List = "list",
  Grid = "grid",
}

export const ViewSelector = () => {
  const [view, setView] = useLocalStorage<ViewEnum>(
    "view",
    (localStorage.getItem("view") as ViewEnum) ?? ViewEnum.List
  );

  return (
    <Select.Root
      defaultValue={view}
      value={view}
      onValueChange={(value: ViewEnum) => setView(value)}
    >
      <Select.Trigger />
      <Select.Content>
        <Select.Group
          style={{
            padding: 0,
          }}
        >
          <Select.Item
            value={ViewEnum.List}
            style={{
              borderBottom: "1px solid black",
            }}
          >
            List
          </Select.Item>
          <Select.Item value={ViewEnum.Grid}>Grid</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};
