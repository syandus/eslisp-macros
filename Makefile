ESLC := ./node_modules/eslisp/bin/eslc

MACRO_INPUTS := $(wildcard *.esl)
MACRO_OUTPUTS := $(MACRO_INPUTS:.esl=.js)

all: $(MACRO_OUTPUTS)
	
%.js: %.esl Makefile
	@rm -f "$@.tmp"
	$(ESLC) --transform eslisp-propertify --transform eslisp-camelify $< > "$@.tmp"
	@cat "$@.tmp" > "$@"
	@rm "$@.tmp"
	@touch "$@"
	
.PHONY: all
