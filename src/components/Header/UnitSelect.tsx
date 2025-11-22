import { useState, useRef } from "react";
import { useUnits } from "@/hooks/useUnits";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { unitSelectGroups } from "@/constants";
import "./UnitSelect.scss";

function UnitSelectDropdownIcon({ isOpen }: { isOpen: boolean }) {
  // It'll be the same icon, but rotated based on isOpen, handled via CSS
  return (
    <img
      src="/images/icon-dropdown.svg"
      alt="Dropdown icon"
      className={`unit-select__dropdown-icon`}
      data-open={isOpen}
    />
  );
}

export default function UnitSelect() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, () => setIsOpen(false));

  return (
    <div className="unit-select" ref={ref}>
      <button
        className="unit-select__button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
      >
        <img src="/images/icon-units.svg" alt="Units icon" />
        <span className="unit-select__label">Units</span>
        <UnitSelectDropdownIcon isOpen={isOpen} />
      </button>

      {isOpen && <UnitSelectMenu />}
    </div>
  );
}

/* -------------------------------------------------------
   🔽 SUB-COMPONENT: UnitSelectMenu
------------------------------------------------------- */

interface UnitSelectMenuProps {}

function getSwitchToText(system: "metric" |"imperial"):string{
  return system === "metric" ? "imperial" : "metric"
}

function UnitSelectMenu({}: UnitSelectMenuProps) {
  const { units, setUnits, currentSystem } = useUnits();

  const handleChange = (group: string, value: string) => {
    setUnits({ ...units, [group]: value });
  };

  return (
    <div className="unit-select-menu">
      <h5>
        Switch to {getSwitchToText(currentSystem)}
      </h5>
      {unitSelectGroups.map((group) => (
        <div key={group.key} className="unit-group">
          <h4>{group.title}</h4>
          {group.options.map((option) => (
            <div
              key={option.value}
              className="unit-option"
              onClick={() => handleChange(group.key, option.value)}
            >
              <span>{option.label}</span>
              {units[group.key as keyof typeof units] === option.value && (
                <img src="/images/icon-checkmark.svg" alt="Check icon" />
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
