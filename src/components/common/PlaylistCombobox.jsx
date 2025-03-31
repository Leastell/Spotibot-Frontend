import {
    Avatar,
    Combobox,
    useCombobox,
    Group,
    Text,
    InputBase,
} from "@mantine/core";
import { useState } from "react";

const PlaylistCombobox = ({ playlists = [], onChange }) => {
    const combobox = useCombobox();
    const [selected, setSelected] = useState(null);
    const [search, setSearch] = useState("");

    const handleSelect = (val) => {
        const match = playlists.find((p) => p.value === val);
        setSelected(match);
        setSearch(""); // clear search on select
        onChange?.(match);
        combobox.closeDropdown();
    };

    const filtered = playlists.filter((pl) =>
        pl.label.toLowerCase().includes(search.toLowerCase())
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
                    label="Playlist"
                    placeholder="Choose a playlist"
                    value={search !== "" ? search : selected?.label || ""}
                    onChange={(event) => {
                        const val = event.currentTarget.value;
                        setSearch(val);
                        if (val === "") setSelected(null); // clear selection
                        combobox.openDropdown();
                    }}
                    onClick={() => combobox.toggleDropdown()}
                    leftSection={
                        selected?.images[selected.images.length]?.url ? (
                            <Avatar
                                src={selected.images[0].url}
                                size="sm"
                                radius="0"
                            />
                        ) : null
                    }
                    rightSection={<Combobox.Chevron />}
                    rightSectionPointerEvents="none"
                />
            </Combobox.Target>

            <Combobox.Dropdown>
                <Combobox.Options style={{ maxHeight: 350, overflowY: "auto" }}>
                    {filtered.length > 0 ? (
                        filtered.map((pl) => (
                            <Combobox.Option value={pl.value} key={pl.value}>
                                <Group>
                                    <Avatar
                                        src={pl.images[0].url || ""}
                                        size="sm"
                                        radius="0"
                                    />
                                    <Text>{pl.label}</Text>
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

export default PlaylistCombobox;
