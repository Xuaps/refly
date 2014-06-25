#!/bin/bash
scriptDir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

configFile=$scriptDir/slash.conf
verbose=false

function usage() {
cat << EOF
    usage: $0 [-h] [-v] [-f configFile] reference[:type][:docset]
EOF
}

function bad_syntax() {
cat << EOF
    Bad syntax for reference, should be:

        reference[:type][:docset]

EOF
}

function process_args() {
    while getopts "f:hv" OPTION
    do
        case $OPTION in
            h)
                usage
                exit 1
                ;;
            f)
                configFile=$OPTARG
                ;;
            v)
                verbose=1
                ;;
            ?)
                usage
                exit
                ;;
        esac
    done
    
    shift $(($OPTIND-1))
    if [[ $# != 1 ]]
    then
        usage
        exit
    fi
}

function read_reference() {
    reference=$1

    parts=$(echo $reference | tr ":" " ")
    num_parts=$(echo $parts | wc -w)

    if [ $num_parts -lt 1 ]
    then
        bad_syntax
        exit 1
    fi
    if [ $num_parts -gt 3 ]
    then
        bad_syntax
        exit 1
    fi
}

process_args $@
read_reference $1
