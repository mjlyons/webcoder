#!/bin/bash

tmux new-session -d 'npm run watch:build'
tmux split-window -v 'npm run watch:test'
tmux split-window -v 'npm run watch:start'
tmux select-layout even-vertical
tmux -2 attach-session -d
