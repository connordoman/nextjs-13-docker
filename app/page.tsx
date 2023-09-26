import Image from "next/image";
import Heading from "./_components/Heading";
import Masthead from "./_components/Masthead";
import HorizontalRule from "./_components/HorizontalRule";
import Code from "./_components/Code";
import { NumberInput, PasswordInput, TextInput } from "./_components/Input";
import { useState } from "react";
import { Button } from "./_components/Button";
import { Textarea } from "./_components/Textarea";

export default function Home() {
    return (
        <main className="flex flex-col gap-4 w-11/12 border-l border-r border-white mx-auto min-h-screen bg-white">
            <Masthead>
                <Heading level={4}>Template Site Name</Heading>
            </Masthead>
            <div className="px-8 py-4">
                <Heading level={1}>Hello!</Heading>
                <Heading level={2}>Hello!</Heading>
                <Heading level={3}>Hello!</Heading>
                <Heading level={4}>Hello!</Heading>
                <Heading level={5}>Hello!</Heading>
                <Heading level={6}>Hello!</Heading>
                <HorizontalRule margin="md" />
                Hello
                <Heading level={4} className="py-4">
                    <Code>TextInput</Code>
                </Heading>
                <TextInput placeholder="Example text input..." />
                <Heading level={4} className="py-4">
                    <Code>PasswordInput</Code>
                </Heading>
                <PasswordInput placeholder="Example password input..." />
                <Heading level={4} className="py-4">
                    <Code>NumberInput</Code>
                </Heading>
                <NumberInput placeholder="Example number input..." />
                <Heading level={4} className="py-4">
                    <Code>Button</Code>
                </Heading>
                <Button>Example button</Button>
                <Heading level={4} className="py-4">
                    <Code>Textarea</Code>
                </Heading>
                <Textarea></Textarea>
            </div>
        </main>
    );
}
