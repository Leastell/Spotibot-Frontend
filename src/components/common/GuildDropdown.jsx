import { Input, InputBase, Combobox, useCombobox } from "@mantine/core";

const GuildDropdown = ({ guilds, selectedGuild, setSelectedGuild }) => {
    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    });

    const options = guilds.map((guild) => (
        <Combobox.Option
            value={guild.id}
            key={guild.id}
            className="guild-option"
        >
            <div className="guild-icon">
                <img
                    src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`}
                />
            </div>
            {guild.name}
        </Combobox.Option>
    ));

    const selectedGuildData = guilds.find(
        (guild) => guild.id === selectedGuild
    );

    return (
        <Combobox
            className="guild-combobox"
            store={combobox}
            onOptionSubmit={(val) => {
                setSelectedGuild(val);
                combobox.closeDropdown();
            }}
        >
            <Combobox.Target>
                <InputBase
                    className="selected-guild"
                    component="button"
                    type="button"
                    pointer
                    rightSection={<Combobox.Chevron />}
                    rightSectionPointerEvents="none"
                    onClick={() => combobox.toggleDropdown()}
                    styles={{
                        input: {
                            height: 56, // Adjust this as needed (try 52–56px)
                            padding: "8px 12px",
                            lineHeight: "20px",
                            display: "flex",
                            alignItems: "center",
                            fontSize: "18px",
                            marginRight: "22px",
                        },
                    }}
                >
                    {selectedGuild ? (
                        <div className="guild-option">
                            <div className="guild-icon">
                                <img
                                    src={`https://cdn.discordapp.com/icons/${selectedGuild}/${selectedGuildData.icon}.png`}
                                />
                            </div>
                            {selectedGuildData.name}
                        </div>
                    ) : (
                        <Input.Placeholder>Choose a Server</Input.Placeholder>
                    )}
                </InputBase>
            </Combobox.Target>

            <Combobox.Dropdown className="guild-dropdown">
                <Combobox.Options>{options}</Combobox.Options>
            </Combobox.Dropdown>
        </Combobox>
    );
};

export default GuildDropdown;
