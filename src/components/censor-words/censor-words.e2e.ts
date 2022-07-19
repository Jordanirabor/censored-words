import { newE2EPage } from '@stencil/core/testing';

describe('censor-words', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<censor-words></censor-words>');
    const element = await page.find('censor-words');
    expect(element).toHaveClass('hydrated');
  });

  it("check's page configuration", async () => {
    const page = await newE2EPage();
    await page.setContent('<censor-words></censor-words>');

    const label = await page.find('censor-words >>> label');
    expect(label.textContent).toEqual(`Enter keywords and phrases to be masked`);

    const button = await page.find('censor-words >>> button');
    expect(button.textContent).toEqual(`Mask`);

    expect((await button.getComputedStyle()).opacity).toEqual("0.5");
  });
});
