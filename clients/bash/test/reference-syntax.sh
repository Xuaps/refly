#!/bin/bash
scriptDir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
slash=$scriptDir/../slash.bash

function test_bad_reference {
	assertMatches "syntax" "$($slash search:function:slash:too_many_colons)"
}
