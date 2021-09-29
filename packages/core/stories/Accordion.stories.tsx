import { ComponentStory, ComponentMeta } from '@storybook/react';

import Accordion from '../src/components/accordion/Accordion';
import AccordionContent from '../src/components/accordion/accordion-content/AccordionContent';
import Badge from '../src/components/badge/Badge';

export default {
    title: 'Core/Accordion',
    component: Accordion,
    args: {},
} as ComponentMeta<typeof Accordion>;

const Template: ComponentStory<typeof Accordion> = ({ children, ...args }) => (
    <Accordion {...args}>{children}</Accordion>
);

const MultipleAccordionsTemplate: ComponentStory<typeof Accordion> = () => (
    <>
        <Accordion group="root" title="Lorem ipsum dolor sit amet, consetetur sadipscing elitr">
            <AccordionContent>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero
                eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
                consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
                dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
                dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
                ipsum dolor sit amet.
            </AccordionContent>
        </Accordion>
        <Accordion
            group="root"
            title="Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet"
        >
            <AccordionContent>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero
                eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                takimata sanctus est Lorem ipsum dolor sit amet.
            </AccordionContent>
        </Accordion>
        <Accordion
            group="root"
            title="At vero eos et accusam et justo duo dolores et ea rebum sit amet dolor"
        >
            <AccordionContent>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero
                eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
                consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
                dolore magna aliquyam erat, sed diam voluptua.
            </AccordionContent>
        </Accordion>
    </>
);

export const General = Template.bind({});

export const MultipleAccordions = MultipleAccordionsTemplate.bind({});

export const WrappedAccordions = Template.bind({});

export const AccordionWithBadge = Template.bind({});

General.args = {
    children: (
        <AccordionContent>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
            invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
            accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
            sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
            sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna
            aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
            rebum.
        </AccordionContent>
    ),
    title: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr',
};

WrappedAccordions.args = {
    children: (
        <>
            <AccordionContent>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero
                eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
                consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
                dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
                dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
                ipsum dolor sit amet.
            </AccordionContent>
            <Accordion group="wrapped" isWrapped title="At vero eos et accusam">
                <AccordionContent>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                    tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
                </AccordionContent>
            </Accordion>
            <Accordion group="wrapped" isWrapped title="Justo duo dolores et ea rebum">
                <AccordionContent>
                    At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
                    gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum
                    dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                    invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
                </AccordionContent>
            </Accordion>
        </>
    ),
    title: 'Lorem ipsum dolor sit amet',
};

AccordionWithBadge.args = {
    children: (
        <AccordionContent>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
            invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
            accusam et justo duo dolores et ea rebum.
        </AccordionContent>
    ),
    right: <Badge>10.000 Euro</Badge>,
    title: 'Lorem ipsum dolor sit amet',
};
