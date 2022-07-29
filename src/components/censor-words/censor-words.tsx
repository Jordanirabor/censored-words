import { Component, State, h } from '@stencil/core';

@Component({
  tag: 'censor-words',
  styleUrl: 'censor-words.css',
  shadow: true,
})
export class CensorWords {
  @State() value: string;
  @State() txtfile: string;

  /* collects phrases and keywords into array */
  collectKeywords = (input: string): string[] => {
    const regex = /"([^"]+)"|'([^']+)'|[^,\s]+/g;
    // discards the surrounding quotation marks. 
    return input.match(regex).map(e => e.replace(/^"|^'|"|'$/g, ''));
  };

  /* traverses string and replaces keywords and phrases with a mask */
  maskOutDocument = (argument, input): string => {
    const mask = 'XXXX';
    const keywords = this.collectKeywords(input);
    const regex = new RegExp(keywords.join('|'), 'gi');
    return argument.replace(regex, mask);
  };

  /* censors document */
  censor = (): string => this.maskOutDocument(this.txtfile, this.value);

  /* checks if txtfile and input file are available */
  canSubmit = () => this.txtfile && this.value;

  /* handles file submit */
  handleSubmit = e => {
    e.preventDefault();
    if (this.canSubmit()) this.save();
  };

  /* handles input change event */
  handleChange = event => {
    this.value = event.target.value;
  };

  /* handles selection of .txt file */
  handleFileSelect = event => {
    const reader = new FileReader();
    reader.readAsText(event.target.files[0]);

    // sets value of this.textfile to string in .txt file
    reader.onload = () => (this.txtfile = reader.result as string);

    // log error, if any
    reader.onerror = () => console.log(reader.error);
  };

  /* prepares censored document and downloads it to filesystem*/
  save = () => {
    const censored = this.censor();
    const content = [`${censored}`];

    const blob = new Blob(content, { type: 'text/plain' });
    const hiddenLink = document.createElement('a');

    hiddenLink.href = URL.createObjectURL(blob);
    hiddenLink.download = 'doc.txt';
    hiddenLink.hidden = true;
    document.body.appendChild(hiddenLink);
    hiddenLink.click();
  };

  render() {
    return (
      <div>
        <form onSubmit={e => this.handleSubmit(e)}>
          <label class="keywords">
            Enter keywords and phrases to be masked
            <textarea value={this.value} cols={55} rows={15} onInput={event => this.handleChange(event)} />
          </label>

          <input class="file" type="file" accept=".txt" onChange={event => this.handleFileSelect(event)}></input>

          <button style={{ opacity: `${this.canSubmit() ? '1' : '0.5'}` }} type="submit">
            Mask
          </button>
        </form>
      </div>
    );
  }
}
