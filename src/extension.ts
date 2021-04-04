// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    let documents = vscode.workspace.textDocuments;

    console.log("Auto Folder: Initialized");

    const changedVisibleTextEditorsListener = vscode.window.onDidChangeVisibleTextEditors(
        (editors) => {
            console.log(editors.length);
            const activeTextEditor = vscode.window.activeTextEditor;

            if (editors.length !== 0 && activeTextEditor) {
                const activeTextDocument = activeTextEditor.document;

                if (!documents.includes(activeTextDocument)) {
                    foldAllRegions();
                }

                documents = vscode.workspace.textDocuments;
            }
        }
    );

    context.subscriptions.push(changedVisibleTextEditorsListener);
}

function foldAllRegions() {
    vscode.commands.executeCommand("editor.foldAllMarkerRegions");
}

// this method is called when your extension is deactivated
export function deactivate() {}
