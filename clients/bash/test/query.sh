#!/bin/bash
scriptDir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

function test_all_args {
    slash=$(mock $scriptDir/../slash "curl")

	$slash search:function,class,type:slash,java

    assertCalled $slash "curl"
    assertCalledExactly 1 $slash "curl"
    assertCalledWith $slash "curl" "http://endymion.cloudapp.net:3000/search?reference=search&types=function&types=class&types=type&docsets=slash&docsets=java"
}

function test_one_of_each {
    slash=$(mock $scriptDir/../slash "curl")

	$slash search:function:slash

    assertCalledWith $slash "curl" "http://endymion.cloudapp.net:3000/search?reference=search&types=function&docsets=slash"
}

function test_no_docset {
    slash=$(mock $scriptDir/../slash "curl")

	$slash search:function

    assertCalledWith $slash "curl" "http://endymion.cloudapp.net:3000/search?reference=search&types=function"
}

function test_no_docset_nor_type {
    slash=$(mock $scriptDir/../slash "curl")

	$slash search

    assertCalledWith $slash "curl" "http://endymion.cloudapp.net:3000/search?reference=search"
}
