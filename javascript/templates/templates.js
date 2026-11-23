/**
 * HTML templates for the shared info dialog. Each returns the title and the scrollable body;
 * the dialog itself (panel, close button) exists only once in index.html.
 */

/**
 * @returns {string} Content of the instruction dialog: key bindings.
 */
function instructionsTemplate() {
    return /*html*/ `
        <h2 id="dialogTitle" class="dialog-title">Anleitung</h2>
        <div class="dialog-body">
            <div class="key-row">
                <div class="arrow-keys">
                    <span class="key-cap key-up">&#9650;</span>
                    <span class="key-cap key-left">&#9664;</span>
                    <span class="key-cap key-down">&#9660;</span>
                    <span class="key-cap key-right">&#9654;</span>
                </div>
                <span class="key-label">Sharkie steuern</span>
            </div>
            <div class="key-row">
                <div class="key-group"><span class="key-cap key-space">Leertaste</span></div>
                <span class="key-label">Flossenschlag</span>
            </div>
            <div class="key-row">
                <div class="key-group"><span class="key-cap">A</span></div>
                <span class="key-label">Blase schießen</span>
            </div>
        </div>
    `;
}

/**
 * @returns {string} Content of the imprint dialog.
 */
function imprintTemplate() {
    return /*html*/ `
        <h2 id="dialogTitle" class="dialog-title">Impressum</h2>
        <div class="dialog-body legal">
            <h3>Angaben gemäß § 5 DDG</h3>
            <p>
                [Rudolf Schultz]<br>
                [Elstergurnd 23]<br>
                [09638 Neuwiese]
            </p>

            <h3>Kontakt</h3>
            <p>E-Mail: [Rudolf.Schultz@kiwigrid.com]</p>

            <h3>Verantwortlich für den Inhalt</h3>
            <p>[Rudolf Schultz], Anschrift wie oben</p>

            <h3>Hinweis</h3>
            <p>Sharkie ist ein privates Lernprojekt ohne kommerzielle Absicht.</p>
        </div>
    `;
}
