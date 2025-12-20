
"use client";

import * as React from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Control } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Option = {
    value: string;
    label: string;
    icon?: React.ReactNode;
};

type FormSelectProps = {
    control: Control<any>;
    name: string;
    placeholder?: string;
    options: Option[];
    icon?: React.ReactNode;
    className?: string;
    label?: string;
    multiple?: boolean;
    iconSize?: number;
};

export const FormSelect = ({
    control,
    name,
    placeholder = "Select an option",
    options,
    icon,
    className,
    label,
    multiple = false,
    iconSize = 20,
}: FormSelectProps) => {
    const cloneIconWithSize = (iconNode: React.ReactNode, size: number) => {
        if (!iconNode || !React.isValidElement(iconNode)) return iconNode;
        return React.cloneElement(iconNode as React.ReactElement<any>, {
            className: cn("text-muted-foreground", (iconNode as any).props.className),
            style: { width: size, height: size, ...(iconNode as any).props.style },
        });
    };

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => {
                const selectedValues = multiple
                    ? (field.value as string[]) || []
                    : field.value
                        ? [field.value]
                        : [];

                const handleMultiSelectChange = (value: string) => {
                    if (!multiple) {
                        field.onChange(value);
                        return;
                    }
                    const current = (field.value as string[]) || [];
                    const newValues = current.includes(value)
                        ? current.filter((v) => v !== value)
                        : [...current, value];
                    field.onChange(newValues);
                };

                // For multi-select: show tags or "X selected"
                const renderTriggerContent = () => {
                    if (!multiple) {
                        const selectedOption = options.find((o) => o.value === field.value);
                        return (
                            <div className="flex items-center gap-2">
                                {selectedOption?.icon && cloneIconWithSize(selectedOption.icon, 16)}
                                <SelectValue placeholder={placeholder} />
                            </div>
                        );
                    }

                    if (selectedValues.length === 0) {
                        return <span className="text-muted-foreground">{placeholder}</span>;
                    }

                    // Show max 2 tags + " +X more" if more
                    const visibleTags = selectedValues.slice(0, 2);
                    const hiddenCount = selectedValues.length - visibleTags.length;

                    return (
                        <div className="flex items-center gap-1.5 flex-wrap">
                            {visibleTags?.map((value) => {
                                const option = options.find((o) => o.value === value);
                                return (
                                    <Badge
                                        key={value}
                                        className="text-xs py-0.5 px-2 h-6 font-medium"
                                    >
                                        {option?.label}
                                    </Badge>
                                );
                            })}
                            {hiddenCount > 0 && (
                                <span className="text-xs text-muted-foreground font-medium">
                                    +{hiddenCount} more
                                </span>
                            )}
                        </div>
                    );
                };

                return (
                    <FormItem className={className}>
                        {label && <FormLabel>{label}</FormLabel>}

                        <Select
                            onValueChange={handleMultiSelectChange}
                            value={multiple ? undefined : field.value ?? ""}
                        >
                            <FormControl>
                                {/* Custom Trigger with Fixed Height */}
                                <SelectTrigger
                                    className={cn(
                                        "h-11 w-full bg-white border-none rounded-figma-sm pl-10 pr-3 text-left font-normal",
                                        "relative"
                                    )}
                                >
                                    {/* Fixed Icon on Left - Now with relative positioning */}
                                    {icon && (
                                        <span
                                            className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center pointer-events-none z-10"
                                            style={{ width: iconSize, height: iconSize }}
                                        >
                                            {cloneIconWithSize(icon, iconSize)}
                                        </span>
                                    )}

                                    {/* Scrollable & Truncated Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="truncate">{renderTriggerContent()}</div>
                                    </div>
                                </SelectTrigger>
                            </FormControl>

                            <SelectContent className="max-h-80">
                                {options?.map((option) => (
                                    <SelectItem
                                        key={option.value}
                                        value={option.value}
                                        className="cursor-pointer pr-2"
                                    >
                                        <div className="flex items-center justify-between w-full gap-3">
                                            {multiple && (
                                                <Checkbox
                                                    checked={selectedValues.includes(option.value)}
                                                    onCheckedChange={() => handleMultiSelectChange(option.value)}
                                                    onClick={(e) => e.stopPropagation()}
                                                />
                                            )}
                                            <div className="flex items-center gap-3 flex-1">
                                                {option.icon && cloneIconWithSize(option.icon, 16)}
                                                <span className="truncate">{option.label}</span>
                                            </div>
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <FormMessage />
                    </FormItem>
                );
            }}
        />
    );
};