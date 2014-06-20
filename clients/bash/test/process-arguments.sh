#!/bin/bash
scriptDir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
slash=$scriptDir/../slash.bash

function test_no_args {
	assertMatches "usage:" "$($slash)"
}

function test_arg_no_reference {
	assertMatches "usage:" "$($slash -f someFile)"
	assertMatches "usage:" "$($slash -v)"
	assertMatches "usage:" "$($slash -h)"
}

function test_illegal_option {
	assertMatches "illegal" "$($slash -r 2>&1)"
}

function test_arg_h {
	assertMatches "usage:" "$($slash -h search:function:slash)"
}

function test_arg_many_args {
	assertMatches "usage:" "$($slash -h search function)"
}
