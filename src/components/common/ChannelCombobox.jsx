import { Combobox, useCombobox, Group, Text, InputBase } from "@mantine/core";
import { useState } from "react";
import { FiHash } from "react-icons/fi";

const ChannelCombobox = ({ channels = [], onChange }) => {
    const combobox = useCombobox();
    const [selected, setSelected] = useState(null);
    const [search, setSearch] = useState("");

    const handleSelect = (val) => {
        const match = channels.find((c) => c.id === val);
        setSelected(match);
        setSearch(""); // clear search on select
        onChange?.(match);
        combobox.closeDropdown();
    };

    const filtered = channels.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Combobox
            store={combobox}
            onOptionSubmit={handleSelect}
            required
            withinPortal
        >
            <Combobox.Target>
                <InputBase
                    label="Channel"
                    placeholder="Choose a channel"
                    value={search !== "" ? search : selected?.name || ""}
                    onChange={(event) => {
                        const val = event.currentTarget.value; // <-- this is what you want
                        setSearch(val);
                        if (val === "") setSelected(null);
                        combobox.openDropdown();
                    }}
                    onClick={() => combobox.toggleDropdown()}
                    leftSection={
                        selected ? (
                            <FiHash size={16} style={{ marginLeft: 6 }} />
                        ) : null
                    }
                    rightSection={<Combobox.Chevron />}
                    rightSectionPointerEvents="none"
                />
            </Combobox.Target>

            <Combobox.Dropdown>
                <Combobox.Options style={{ maxHeight: 350, overflowY: "auto" }}>
                    {filtered.length > 0 ? (
                        filtered.map((c) => (
                            <Combobox.Option value={c.id} key={c.id}>
                                <Group>
                                    <FiHash />
                                    <Text>{c.name}</Text>
                                </Group>
                            </Combobox.Option>
                        ))
                    ) : (
                        <Combobox.Empty>Nothing found</Combobox.Empty>
                    )}
                </Combobox.Options>
            </Combobox.Dropdown>
        </Combobox>
    );
};

export default ChannelCombobox;
